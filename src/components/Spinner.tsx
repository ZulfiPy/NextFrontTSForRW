'use client';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "50px auto"
}

const Spinner = ({ loading }: { loading: boolean }) => {
    return (
        <div className="flex flex-col items-center">
            <ClipLoader
                loading={loading}
                color="#fffff"
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
            />
            <p className="font-bold">Loading...</p>
        </div>
    )
}

export default Spinner;