import { z } from "zod";
import { createMcpHandler } from "mcp-handler";
import { commitCarsDrivenToGitHub, fetchCarsDrivenFromGitHub, isDuplicateCar } from "./github-cars";

const handler = createMcpHandler(
  server => {
    server.registerTool(
      "add_car",
      {
        title: "Add a new car your drove",
        description:
          "Appends a car (make + model) to cars_driven.json on GitHub and triggers a deployment. Use after the user confirms make and model.",
        inputSchema: {
          make: z.string().min(1).describe("Vehicle manufacturer, e.g. Mahindra"),
          model: z.string().min(1).describe("Model name, e.g. XUV 3XO")
        }
      },
      async ({ make, model }) => {
        const makeTrim = make.trim();
        const modelTrim = model.trim();

        if (!process.env.GITHUB_PAT) {
          return {
            content: [
              {
                type: "text",
                text: "Error: GITHUB_PAT is not set. Add a GitHub token with contents:write on the repo in Vercel (or .env locally)."
              }
            ],
            isError: true
          };
        }

        try {
          const { cars, sha } = await fetchCarsDrivenFromGitHub();

          if (isDuplicateCar(cars, makeTrim, modelTrim)) {
            return {
              content: [
                {
                  type: "text",
                  text: `No change: **${makeTrim}** **${modelTrim}** is already in your list.`
                }
              ]
            };
          }

          const updatedCarsDrivenArray = [...cars, { make: makeTrim, model: modelTrim }];

          const { commitUrl } = await commitCarsDrivenToGitHub(
            updatedCarsDrivenArray,
            sha,
            `chore(cars_driven): Drove a new car ${makeTrim} ${modelTrim}\n\n🤖 Added via custom mcp server`
          );

          return {
            content: [
              {
                type: "text",
                text: `Confirmed: make **${makeTrim}**, model **${modelTrim}**.\nCommitted to GitHub: ${commitUrl}\nPlease wait for a minute for the deployment to complete.`
              }
            ]
          };
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          return {
            content: [{ type: "text", text: `Error: ${msg}` }],
            isError: true
          };
        }
      }
    );
  },
  {},
  { basePath: "/api" }
);

export { handler as GET, handler as POST, handler as DELETE };
