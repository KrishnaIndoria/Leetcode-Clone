import { NavLink } from "react-router";

function AdminPage() {
    return (
        <div className="min-h-screen bg-slate-950 px-6 py-10">

            <div className="max-w-7xl mx-auto">

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white">
                        Admin Dashboard
                    </h1>

                    <p className="text-slate-400 mt-2">
                        Manage coding problems for your platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Create Problem */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg hover:border-cyan-500 transition-all duration-300">

                        <div className="text-5xl mb-5">
                            📝
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Create Problem
                        </h2>

                        <p className="text-slate-400 mb-8">
                            Add a new coding problem with description,
                            test cases and starter code.
                        </p>

                        <NavLink
                            to="/Admin/Create"
                            className="btn btn-info w-full"
                        >
                            Create
                        </NavLink>

                    </div>

                    {/* Update Problem */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg hover:border-yellow-500 transition-all duration-300">

                        <div className="text-5xl mb-5">
                            ✏️
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Update Problem
                        </h2>

                        <p className="text-slate-400 mb-8">
                            Modify problem statements, constraints,
                            code templates or test cases.
                        </p>

                        <NavLink
                            to="/Admin/Update"
                            className="btn btn-warning w-full"
                        >
                            Update
                        </NavLink>

                    </div>

                    {/* Delete Problem */}

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg hover:border-red-500 transition-all duration-300">

                        <div className="text-5xl mb-5">
                            🗑️
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-3">
                            Delete Problem
                        </h2>

                        <p className="text-slate-400 mb-8">
                            Permanently remove coding problems from
                            the platform.
                        </p>

                        <NavLink
                            to="/Admin/Delete"
                            className="btn btn-error w-full"
                        >
                            Delete
                        </NavLink>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AdminPage;