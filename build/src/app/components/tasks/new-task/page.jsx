import NewTaskForm from "@/components/NewTaskForm";
const NewTaskPage = () => {
    return (<section className="container flex flex-col items-center justify-center min-h-screen space-y-10">
            <h1 className="text-3xl font-bold mt-10">New Task Form</h1>
            <NewTaskForm />
        </section>);
};
export default NewTaskPage;
