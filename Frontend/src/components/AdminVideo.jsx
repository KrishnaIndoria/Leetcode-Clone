import { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { NavLink } from "react-router";

function AdminVideo() {

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProblems();
    }, []);

    async function fetchProblems() {
        try {

            const { data } = await axiosClient.get("/problem/getAllProblem");

            setProblems(data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(id, title) {

        const confirmDelete = window.confirm(
            `Video Delete "${title}" ?`
        );

        if (!confirmDelete) return;

        try {

            await axiosClient.delete(`/video/delete/${id}`);

            setProblems((prev) =>
                prev.filter((problem) => problem._id !== id)
            );

            alert("video deleted successfully.");

        } catch (err) {

            console.log(err);
            alert(err.response.data.error);

        }
    }

    if (loading) {

        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-info"></span>
            </div>
        );

    }

    return (

        <div className="min-h-screen bg-slate-950 px-6 py-10">

            <div className="max-w-7xl mx-auto">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-white">
                        Upload and Delete videos
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Select a problem to add or remove video.
                    </p>

                </div>

                {
                    problems.length === 0 ? (

                        <div className="text-center text-slate-400 text-xl mt-20">
                            No Problems Found
                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {
                                problems.map((problem) => (

                                    <div
                                        key={problem._id}
                                        className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex justify-between items-center hover:border-red-500 transition"
                                    >

                                        <div>

                                            <h2 className="text-xl font-semibold text-white">
                                                {problem.title}
                                            </h2>

                                            <div className="flex gap-3 mt-3">

                                                <span
                                                    className={`badge ${
                                                        problem.difficulty === "Easy"
                                                            ? "badge-success"
                                                            : problem.difficulty === "Medium"
                                                            ? "badge-warning"
                                                            : "badge-error"
                                                    }`}
                                                >
                                                    {problem.difficulty}
                                                </span>

                                                <span className="badge badge-info">
                                                    {problem.Tags}
                                                </span>

                                            </div>

                                        </div>

                                        <NavLink
                                           to='/Admin/Upload/:${problem._id}'
                                           className="btn bg-amber-500"
                                        >
                                           Upload
                                        </NavLink>

                                        <button
                                            className="btn btn-error"
                                            onClick={() =>
                                                handleDelete(
                                                    problem._id,
                                                    problem.title
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default AdminVideo;