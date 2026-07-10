import Editor from '@monaco-editor/react';
import axiosClient from '../utils/axiosClient';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router';

function Dummy(){
    const {id} = useParams();
    const [problem,setProblem] = useState([]);
    useEffect(()=>{
        const fetchProblem =async()=>{
            const response = await axiosClient.get(`/problem/problemID/${id}`);
            setProblem(response.data);
        }
        fetchProblem();
    },[])

    return <Editor height="90vh" defaultLanguage="javascript" defaultValue="// some comment" />;
    
}

export default Dummy;