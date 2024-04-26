import { z } from "zod";

const taskSchema = z.object({
    title: z.string().min(2,
        { message: "Title must be a least 2 characters." }).max(30,
            { message: "Title must fit into 30 characters." }),
    description: z.string().min(2,
        { message: "Description must be a least 2 characters," }).max(100,
            { message: "Description must fit into 100 characters." }),
    priority: z.string().min(1,
        { message: "Please select priority of task." }),
    status: z.string().min(2,
        { message: "Status must be at least 2 characters" }).max(20,
            { message: "Status must fit into 100 characters." }),
});

export default taskSchema;