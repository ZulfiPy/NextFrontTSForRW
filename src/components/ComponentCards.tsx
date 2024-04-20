import CardComponent from "./CardComponent";

const ComponentCards = () => {
    return (
        <>
            <h1 className="font-bold mb-24 text-2xl">MyComponents</h1>
            <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
                <CardComponent
                    cardTitle={'MyCustomers'}
                    cardDescription={'Manage customer data for enhanced service and communication.'}
                />

                <CardComponent
                    cardTitle={'MyFleet'}
                    cardDescription={'Track vehicle status, location, and maintenance to optimize fleet operations.'}
                />


                <CardComponent
                    cardTitle={'MyTasks'}
                    cardDescription={'Organize and prioritize daily tasks to maintain productivity and meet deadlines.'}
                />

                <CardComponent
                    cardTitle={'MyInsurance'}
                    cardDescription={'Access insurance policies, coverage, and renewal information for easy management.'}
                />
            </div>
        </>
    )
}

export default ComponentCards;