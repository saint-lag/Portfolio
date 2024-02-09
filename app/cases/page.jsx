import React from "react";
import { Navigation } from "../components/nav";
//import { Card } from "../components/card";
import CldImage from "../components/cloudinary";
//import { Article } from "./article";
//import chunk from "lodash/chunk";
import data from "../../data.json";
import cases from "../../public/Images/cases.json";
import { getRepos, getPinnedRepos, getVercelProjects } from "../data";

export default async function ProjectsPage() {
  const username = process.env.GITHUB_USERNAME || data.githubUsername;
  const [repositories, pinnedNames, vercelProjects] = await Promise.all([
    getRepos(username),
    getPinnedRepos(username),
    getVercelProjects(),
  ]);

  const vercelProjectsDetails = vercelProjects.projects
    .filter((project) => {
      const githubRepo = repositories.find(
        (repo) => repo.name === project.name
      );
      return githubRepo;
    })
    .map((project) => ({
      framework: project.framework,
      name: project.name,
      nodeVersion: project.nodeVersion,
      link: project.link,
      description: project.description,
    }));

  repositories.forEach((repo) => {
    const vercelRepo = vercelProjectsDetails.find(
      (vercelRepo) => vercelRepo.name === repo.name
    );
    if (vercelRepo) {
      repo.vercel = vercelRepo;
    }
  });

  const heroes = repositories
    .filter((project) => pinnedNames.includes(project.name))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
  const sorted = repositories
    .filter((p) => !p.private)
    .filter((p) => !p.fork)
    .filter((p) => !p.archived)
    .filter((p) => !pinnedNames.includes(p.name))
    .filter((p) => !data.projects.blacklist.includes(p.name))
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime()
    );

  const chunkSize = Math.ceil(sorted.length / 3);
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-12 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Cases
          </h2>
          <p className="mt-4 text-zinc-400">{data.description}</p>
        </div>

        <div className="w-full h-px bg-zinc-800" />
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-3 ">
          <div className="grid grid-cols-1 gap-4">
            <CldImage
              src={cases.sample.src}
              width={cases.sample.width}
              height={cases.sample.height}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CldImage
              src={cases.sample.src}
              width={cases.sample.width}
              height={cases.sample.height}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CldImage
              src={cases.sample.src}
              width={cases.sample.width}
              height={cases.sample.height}
            />
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-4">
            <CldImage
              src={cases.donut.src}
              width={cases.donut.width}
              height={cases.donut.height}
            />
            <CldImage
              src={cases.donut.src}
              width={cases.donut.width}
              height={cases.donut.height}
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <CldImage
              src={cases.donut.src}
              width={cases.donut.width}
              height={cases.donut.height}
            />
            <CldImage
              src={cases.donut.src}
              width={cases.donut.width}
              height={cases.donut.height}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
