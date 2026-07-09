import { logoutUser } from "../authSlice";
import { useDispatch ,useSelector} from "react-redux";
import axiosClient from '../utils/axiosClient';
import { useEffect,useState } from "react";
import { NavLink } from "react-router";
function HomePage(){
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.auth);
    const [allProblems,setallProblems] = useState([]);
    const [solvedProblems,setsolvedProblems] = useState([]);
    const [filters,setFilters] = useState({
        'difficulty':'all',
        'tag':'all',
        'status':'all'
    })
    const handleLogout = ()=>{
        dispatch(logoutUser());
    }
    useEffect(()=>{
        fetchAllProblems();
        fetchsolvedByUser();
    },[])

    const fetchAllProblems = async()=>{
        try{
            const {data} = await axiosClient.get('/problem/getAllProblem');
            setallProblems(data);
        }
        catch(err){
            console.error(err);
        }
    }

    const fetchsolvedByUser = async()=>{
        try{
            const {data} = await axiosClient.get('/problem/solvedByUser');
            setsolvedProblems(data);
        }
        catch(err){
            console.error(err);
        }
    }

    const filteredProblems = allProblems.filter(problem=>{
        const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
        const tagMatch = filters.tag === 'all' || problem.Tags === filters.tag;
        const statusMatch = filters.status === 'all'|| solvedProblems.some(sp=>sp._id === problem._id);
        return difficultyMatch && tagMatch && statusMatch;
    })

   return (
    <div className="min-h-screen bg-slate-950 text-white">

        {/* ================= NAVBAR ================= */}

        <div className="navbar bg-slate-900 border-b border-slate-800 px-8 sticky top-0 z-50">

            <div className="flex-1">
                <h1 className="text-2xl font-bold text-cyan-400 tracking-wide cursor-pointer">
                    CodeVerse
                </h1>
            </div>

            <div className="flex-none gap-4">

                <div className="dropdown dropdown-end">

                    <label
                        tabIndex={0}
                        className="btn btn-ghost rounded-full flex gap-3"
                    >
                        <div className="avatar placeholder">
                            <div className="bg-cyan-600 text-white rounded-full w-10">
                                <span>
                                    {user?.firstName?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        <span className="hidden md:block">
                            {user?.firstName}
                        </span>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu dropdown-content mt-3 w-44 bg-slate-900 rounded-xl shadow-xl border border-slate-700"
                    >
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-red-400"
                            >
                                Logout
                            </button>
                        </li>
                        {user.role=="admin" &&<li><NavLink to="/Admin">Admin</NavLink></li>}
                    </ul>

                </div>

            </div>

        </div>



        {/* ================= BODY ================= */}

        <div className="max-w-7xl mx-auto py-10 px-5">

            {/* Filters */}

            <div className="flex flex-wrap gap-4 justify-between items-center mb-8">

                <div className="flex flex-wrap gap-4">

                    <select
                        className="select select-bordered bg-slate-900 border-slate-700"
                        value={filters.difficulty}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                difficulty: e.target.value,
                            })
                        }
                    >
                        <option value="all">All Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <select
                        className="select select-bordered bg-slate-900 border-slate-700"
                        value={filters.tag}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                tag: e.target.value,
                            })
                        }
                    >
                        <option value="all">All Tags</option>
                        <option value="Array">Array</option>
                        <option value="String">String</option>
                        <option value="Linked List">Linked List</option>
                        <option value="Tree">Tree</option>
                        <option value="Graph">Graph</option>
                        <option value="DP">DP</option>
                    </select>

                    <select
                        className="select select-bordered bg-slate-900 border-slate-700"
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="all">All Problems</option>
                        <option value="solved">Solved</option>
                    </select>

                </div>

                <input
                    type="text"
                    placeholder="Search Problem..."
                    className="input input-bordered bg-slate-900 border-slate-700 w-72"
                />

            </div>



            {/* Count */}

            <div className="mb-4 text-slate-400">
                Showing
                <span className="text-cyan-400 font-semibold mx-2">
                    {filteredProblems.length}
                </span>
                Problems
            </div>



            {/* ================= TABLE ================= */}

            <div className="overflow-x-auto rounded-xl border border-slate-800">

                <table className="table">

                    <thead className="bg-slate-900 text-slate-300">

                        <tr>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>Tag</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredProblems.map((problem) => {

                            const solved = solvedProblems.some(
                                (sp) => sp._id === problem._id
                            );

                            return (

                                <tr
                                    key={problem._id}
                                    className="hover:bg-slate-900 transition cursor-pointer"
                                >

                                    <td>

                                        {solved ? (
                                            <span className="text-green-400 text-lg">
                                                ✓
                                            </span>
                                        ) : (
                                            <span className="text-slate-600">
                                                —
                                            </span>
                                        )}

                                    </td>

                                    <td className="font-medium">
                                        <NavLink to={`/Dummy/${problem._id}`} className="hover:text-primary">{problem.title}</NavLink>
                                    </td>

                                    <td>

                                        <span
                                            className={`badge
                                            ${
                                                problem.difficulty === "Easy"
                                                    ? "badge-success"
                                                    : problem.difficulty === "Medium"
                                                    ? "badge-warning"
                                                    : "badge-error"
                                            }`}
                                        >
                                            {problem.difficulty}
                                        </span>

                                    </td>

                                    <td>

                                        <span className="badge badge-outline border-cyan-500 text-cyan-300">
                                            {problem.Tags}
                                        </span>

                                    </td>

                                </tr>

                            );
                        })}

                    </tbody>

                </table>

            </div>

        </div>

    </div>
);
}

export default HomePage