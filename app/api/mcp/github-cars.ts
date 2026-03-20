import { Car } from "@/types";

const REPO = "dheerajmahra/dheerajmahra.com";
const FILE_PATH = "app/components/cars-driven/cars_driven.json";
const BRANCH = "main";

const githubHeaders = (): HeadersInit => {
  const token = process.env.GITHUB_PAT;

  if (!token) {
    throw new Error("GITHUB_PAT is not configured");
  }

  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
};

const contentsUrl = () => `https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`;

export const fetchCarsDrivenFromGitHub = async (): Promise<{ cars: Car[]; sha: string }> => {
  const res = await fetch(`${contentsUrl()}?ref=${BRANCH}`, {
    headers: githubHeaders()
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub GET failed (${res.status}): ${body}`);
  }

  const data = (await res.json()) as { content: string; sha: string };
  const raw = Buffer.from(data.content.replace(/\s/g, ""), "base64").toString("utf8");
  const cars = JSON.parse(raw) as Car[];

  if (!Array.isArray(cars)) {
    throw new Error("cars_driven.json is not a JSON array");
  }

  return { cars, sha: data.sha };
};

export const isDuplicateCar = (cars: Car[], make: string, model: string): boolean => {
  const m = make.trim();
  const mod = model.trim();
  return cars.some(
    c =>
      c.make.trim().toLowerCase() === m.toLowerCase() &&
      c.model.trim().toLowerCase() === mod.toLowerCase()
  );
};

export const commitCarsDrivenToGitHub = async (
  cars: Car[],
  sha: string,
  commitMessage: string
): Promise<{ commitUrl: string }> => {
  const body = `${JSON.stringify(cars, null, 2)}\n`;
  const content = Buffer.from(body, "utf8").toString("base64");

  const res = await fetch(contentsUrl(), {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message: commitMessage,
      content,
      sha,
      branch: BRANCH
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub PUT failed (${res.status}): ${text}`);
  }

  const out = (await res.json()) as {
    commit?: { sha: string; html_url?: string };
  };

  const commitUrl =
    out.commit?.html_url ??
    (out.commit?.sha ? `https://github.com/${REPO}/commit/${out.commit.sha}` : "");

  return { commitUrl: commitUrl || "committed (no URL in response)" };
};
