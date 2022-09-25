import express, { Request, Response } from "express";
import { Project, validateProject } from "../models/project";
import validateId from "../middleware/validateId";
import validate from "../middleware/validate";

const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find().sort("-_id");

  res.send(projects);
});

router.post("/", validate(validateProject), async (req, res) => {
  const project = new Project({
    name: req.body.name,
    repo: req.body.repo,
    link: req.body.link,
    desc: req.body.desc,
    stack: req.body.stack,
  });

  await project.save();

  res.send(project);
});

router.put(
  "/:id",
  [validate(validateProject), validateId],
  async (req: Request, res: Response) => {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        repo: req.body.repo,
        link: req.body.link,
        desc: req.body.desc,
        stack: req.body.stack,
      },
      { new: true }
    );

    if (!project)
      return res
        .status(404)
        .send("The project with the given ID was not found");

    res.send(project);
  }
);

router.get("/:id", validateId, async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found");

  res.send(project);
});

router.delete("/:id", validateId, async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project)
    return res.status(404).send("The project with the given ID was not found");

  res.send(project);
});

export default router;
