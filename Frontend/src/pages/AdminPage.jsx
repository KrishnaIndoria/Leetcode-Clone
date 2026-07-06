import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosClient from "../utils/axiosClient";

const AdminSchema = z.object({
    title: z.string().min(3, "Minimum 3 characters"),
    description: z.string().min(3, "Description is required"),

    difficulty: z.enum(["Easy", "Medium", "Hard"]),

    Tags: z.enum([
        "Array",
        "String",
        "2D Array",
        "Stack",
        "Queue",
        "Linked List",
        "Trees",
        "Graph",
        "DP",
    ]),

    visibleTestCases: z
        .array(
            z.object({
                inputs: z.string().min(1, "Input needed"),
                output: z.string().min(1, "Output needed"),
                explanation: z.string().min(1, "Explanation needed"),
            })
        )
        .min(1, "At least one visible test case required"),

    HiddenTestCases: z
        .array(
            z.object({
                inputs: z.string().min(1, "Input needed"),
                output: z.string().min(1, "Output needed"),
            })
        )
        .min(1, "At least one hidden test case required"),

    startCode: z
        .array(
            z.object({
                language: z.string().min(1),
                initialCode: z.string().min(1),
            })
        )
        .min(3),

    referenceCode: z
        .array(
            z.object({
                language: z.string().min(1),
                completeCode: z.string().min(1),
            })
        )
        .min(3),
});

function AdminPage() {

    const submittedForm = async (data) => {
        try {
            await axiosClient.post("/problem/create", data);
            alert("Problem Created Successfully");
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    };

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(AdminSchema),

        defaultValues: {

            difficulty: "Easy",

            Tags: "Array",

            visibleTestCases: [
                {
                    inputs: "",
                    output: "",
                    explanation: "",
                },
            ],

            HiddenTestCases: [
                {
                    inputs: "",
                    output: "",
                },
            ],

            startCode: [
                {
                    language: "c++",
                    initialCode: "",
                },
                {
                    language: "java",
                    initialCode: "",
                },
                {
                    language: "javascript",
                    initialCode: "",
                },
            ],

            referenceCode: [
                {
                    language: "c++",
                    completeCode: "",
                },
                {
                    language: "java",
                    completeCode: "",
                },
                {
                    language: "javascript",
                    completeCode: "",
                },
            ],
        },
    });

    const {
        fields: visibleFields,
        append: addVisible,
        remove: removeVisible,
    } = useFieldArray({
        control,
        name: "visibleTestCases",
    });

    const {
        fields: hiddenFields,
        append: addHidden,
        remove: removeHidden,
    } = useFieldArray({
        control,
        name: "HiddenTestCases",
    });

    const {
        fields: starterFields,
    } = useFieldArray({
        control,
        name: "startCode",
    });

    const {
        fields: referenceFields,
    } = useFieldArray({
        control,
        name: "referenceCode",
    });

    return (

        <div className="min-h-screen bg-slate-950 py-10 px-6">

            <div className="max-w-7xl mx-auto">

                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">

                    <div className="border-b border-slate-800 p-8">

                        <h1 className="text-4xl font-bold text-cyan-400">
                            Create Coding Problem
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Fill all details carefully before publishing.
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit(submittedForm)}
                        className="space-y-10 p-8"
                    >                        {/* ================= PROBLEM DETAILS ================= */}

                        <div className="space-y-6">

                            <h2 className="text-2xl font-semibold text-white">
                                Problem Details
                            </h2>

                            <div>

                                <label className="label">
                                    <span className="label-text text-slate-300">
                                        Problem Title
                                    </span>
                                </label>

                                <input
                                    {...register("title")}
                                    placeholder="e.g. Add Two Numbers"
                                    className="input input-bordered bg-slate-900 border-slate-700 w-full text-cyan-200"/>

                                {errors.title && (
                                    <p className="text-red-400 mt-2">
                                        {errors.title.message}
                                    </p>
                                )}

                            </div>

                            <div>

                                <label className="label">
                                    <span className="label-text text-slate-300">
                                        Description
                                    </span>
                                </label>

                                <textarea
                                    rows={8}
                                    {...register("description")}
                                    placeholder="Problem description..."
                                    className="textarea text-cyan-200 textarea-bordered bg-slate-900 border-slate-700 w-full"
                                />

                                {errors.description && (
                                    <p className="text-red-400 mt-2">
                                        {errors.description.message}
                                    </p>
                                )}

                            </div>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>

                                    <label className="label">
                                        <span className="label-text text-slate-300">
                                            Difficulty
                                        </span>
                                    </label>

                                    <select
                                        {...register("difficulty")}
                                        className="select text-cyan-200 select-bordered bg-slate-900 border-slate-700 w-full"
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>

                                </div>

                                <div>

                                    <label className="label">
                                        <span className="label-text text-slate-300">
                                            Tag
                                        </span>
                                    </label>

                                    <select
                                        {...register("Tags")}
                                        className="select text-cyan-200 select-bordered bg-slate-900 border-slate-700 w-full"
                                    >
                                        <option value="Array">Array</option>
                                        <option value="String">String</option>
                                        <option value="2D Array">2D Array</option>
                                        <option value="Stack">Stack</option>
                                        <option value="Queue">Queue</option>
                                        <option value="Linked List">Linked List</option>
                                        <option value="Trees">Trees</option>
                                        <option value="Graph">Graph</option>
                                        <option value="DP">DP</option>
                                    </select>

                                </div>

                            </div>

                        </div>





                        {/* ================= VISIBLE TEST CASES ================= */}

                        <div className="space-y-6">

                            <div className="flex justify-between items-center">

                                <h2 className="text-2xl font-semibold text-cyan-400">
                                    Visible Test Cases
                                </h2>

                                <button
                                    type="button"
                                    onClick={() =>
                                        addVisible({
                                            inputs: "",
                                            output: "",
                                            explanation: "",
                                        })
                                    }
                                    className="btn btn-info btn-sm"
                                >
                                    + Add Test Case
                                </button>

                            </div>

                            {visibleFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="bg-slate-900 text-cyan-200 border border-slate-700 rounded-xl p-6 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3 className="font-semibold">
                                            Test Case {index + 1}
                                        </h3>

                                        {visibleFields.length > 1 && (

                                            <button
                                                type="button"
                                                onClick={() => removeVisible(index)}
                                                className="btn btn-error btn-xs"
                                            >
                                                Remove
                                            </button>

                                        )}

                                    </div>

                                    <input
                                        {...register(`visibleTestCases.${index}.inputs`)}
                                        placeholder="Input"
                                        className="input input-bordered w-full bg-slate-950"
                                    />

                                    <input
                                        {...register(`visibleTestCases.${index}.output`)}
                                        placeholder="Output"
                                        className="input input-bordered w-full bg-slate-950"
                                    />

                                    <textarea
                                        rows={3}
                                        {...register(`visibleTestCases.${index}.explanation`)}
                                        placeholder="Explanation"
                                        className="textarea textarea-bordered w-full bg-slate-950"
                                    />

                                </div>

                            ))}

                        </div>






                        {/* ================= HIDDEN TEST CASES ================= */}

                        <div className="space-y-6">

                            <div className="flex justify-between items-center">

                                <h2 className="text-2xl font-semibold text-cyan-400">
                                    Hidden Test Cases
                                </h2>

                                <button
                                    type="button"
                                    onClick={() =>
                                        addHidden({
                                            inputs: "",
                                            output: "",
                                        })
                                    }
                                    className="btn btn-info btn-sm"
                                >
                                    + Add Hidden Test Case
                                </button>

                            </div>

                            {hiddenFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="bg-slate-900  text-cyan-200 border border-slate-700 rounded-xl p-6 space-y-4"
                                >

                                    <div className="flex justify-between">

                                        <h3 className="font-semibold">
                                            Hidden Test {index + 1}
                                        </h3>

                                        {hiddenFields.length > 1 && (

                                            <button
                                                type="button"
                                                onClick={() => removeHidden(index)}
                                                className="btn btn-error btn-xs"
                                            >
                                                Remove
                                            </button>

                                        )}

                                    </div>

                                    <input
                                        {...register(`HiddenTestCases.${index}.inputs`)}
                                        placeholder="Input"
                                        className="input input-bordered bg-slate-950 w-full"
                                    />

                                    <input
                                        {...register(`HiddenTestCases.${index}.output`)}
                                        placeholder="Output"
                                        className="input input-bordered bg-slate-950 w-full"
                                    />

                                </div>

                            ))}

                        </div>                        {/* ================= STARTER CODE ================= */}

                        <div className="space-y-8">

                            <h2 className="text-2xl font-semibold text-white">
                                Starter Code
                            </h2>

                            {starterFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="bg-slate-900 text-cyan-200 border border-slate-700 rounded-xl p-6"
                                >

                                    <div className="flex justify-between items-center mb-4">

                                        <h3 className="text-lg font-semibold text-cyan-400">
                                            {field.language.toUpperCase()}
                                        </h3>

                                    </div>

                                    <input
                                        hidden
                                        {...register(`startCode.${index}.language`)}
                                    />

                                    <textarea
                                        rows={12}
                                        {...register(`startCode.${index}.initialCode`)}
                                        placeholder={`Starter ${field.language} code...`}
                                        className="textarea textarea-bordered w-full bg-slate-950 border-slate-700 font-mono text-sm"
                                    />

                                    {errors.startCode?.[index]?.initialCode && (
                                        <p className="text-red-400 mt-2">
                                            {errors.startCode[index].initialCode.message}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </div>





                        {/* ================= REFERENCE CODE ================= */}

                        <div className="space-y-8">

                            <h2 className="text-2xl font-semibold text-white">
                                Reference Solution
                            </h2>

                            {referenceFields.map((field, index) => (

                                <div
                                    key={field.id}
                                    className="bg-slate-900 border text-cyan-200 border-slate-700 rounded-xl p-6"
                                >

                                    <div className="flex justify-between items-center mb-4">

                                        <h3 className="text-lg font-semibold text-green-400">
                                            {field.language.toUpperCase()}
                                        </h3>

                                    </div>

                                    <input
                                        hidden
                                        {...register(`referenceCode.${index}.language`)}
                                    />

                                    <textarea
                                        rows={14}
                                        {...register(`referenceCode.${index}.completeCode`)}
                                        placeholder={`Reference ${field.language} solution...`}
                                        className="textarea textarea-bordered w-full bg-slate-950 border-slate-700 font-mono text-sm"
                                    />

                                    {errors.referenceCode?.[index]?.completeCode && (
                                        <p className="text-red-400 mt-2">
                                            {errors.referenceCode[index].completeCode.message}
                                        </p>
                                    )}

                                </div>

                            ))}

                        </div>





                        {/* ================= SUBMIT ================= */}

                        <div className="flex justify-end pt-6 border-t border-slate-800">

                            <button
                                type="submit"
                                className="btn btn-info btn-wide text-white text-lg"
                            >
                                 Create Problem
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default AdminPage;