import React,{useEffect, useState} from 'react'
import styled from "styled-components"
 function ToDo() {
    //task elements indaakiiii
    const [tasks,setTasks]  = useState([
        {
            id:1,
            title:"buy 1kg Tomato ",
        },
        {
            id:2,
            title:"buy 2kg ONION ",
        },
        {
            id:3,
            title:"Visit a Friend",

        },
        {
            id:4,
            title:"Clean House" ,
        },
       

    ]);
    //comleted elements indaaakiiiiii
    const[completed,setCompleted] = useState([
        {
            id:5,
            title:"Washing Clothes",
        },
        {
            id:6,
            title:"Play Cricket ",
        },
        {
            id:7,
            title:"Walking",

        },
        {
            id:8,
            title:"HOME" ,
        },
       
    ]);
    //new task define cheyduuu 
    const [newTask,setNewTask] = useState("");
    // number order aakiiiii
    const[itemCount,setItemCount] = useState(0);
    useEffect(()=>{
        setItemCount(completed.length+tasks.length);
    },[]);
    //deletetask chayyanulllad
    const deleteTasks = (id)=>{
        let new_list = tasks.filter((task)=> task.id !==id);
        setTasks(new_list); 
    };
    //delete completed chayyanulllad
    // 
    const deleteCompleted= (id)=>{
        let new_list = completed.filter((task)=> task.id !==id);
        setCompleted(new_list); 
    };
    // taskil ninnne completedilekke kodkkanullad
    const completeTask= (id)=>{
        let current_task = tasks.find((task) => task.id === id);
        setCompleted([...completed,current_task]);

        let new_list = tasks.filter((task)=> task.id !==id);
        setTasks(new_list); 
    }
    // completedil ninnne taskileekee kodkkanullad

    const revertTask= (id)=>{
        let current_task = completed.find((task) => task.id === id);
        setTasks([...tasks,current_task]);

        let new_list = completed.filter((task)=> task.id !==id);
        setCompleted(new_list); 
    }
    //taskil anta nadakkendath annnnadeee ayudiii
    const renderTasks = ()=>{
        return tasks.map( (task)=>(
            <ListItem>
                    <LeftContainer onClick={ ()=> completeTask(task.id) }>
                        <CheckContainer></CheckContainer>
                        <Itemcontant>{task.id}, {task.title}</Itemcontant>
                    </LeftContainer>
                    <RightContainer>
                        <ActionButton 
                            onClick={()=>{deleteTasks(task.id)}}
                        >
                            <ButtonImage src={require("./assets/delete.svg").default} alt='delete'/>
                        </ActionButton>
                    </RightContainer>
                </ListItem>
        ) )
    }
    //completedil anta nadakkendath annnnadeee ayudiii

    const renderCompleted = ()=>{
        return completed.map( (task)=>(
            <ListItem>
                    <LeftContainer>
                        <CheckContainerCompleted>
                            <Tickimage src={require("./assets/tick-green.svg").default} alt='tick-green' />
                        </CheckContainerCompleted>
                        <ItemcontantCompleted>{task.id}, {task.title}</ItemcontantCompleted>
                    </LeftContainer>
                    <RightContainer>
                        <ActionButton onClick={ ()=> revertTask(task.id)}>
                            <ButtonImage src={require("./assets/revert.svg").default} alt='delete'/>
                        </ActionButton>
                        <ActionButton  onClick={()=>{deleteCompleted(task.id)}}>
                            <ButtonImage src={require("./assets/delete.svg").default} alt='delete'/>
                        </ActionButton>
                    </RightContainer>
                </ListItem>
        ) )
    }
    // number order aakaaannnn
    const addNewTask = ( event)=>{
        event.preventDefault();
        let new_task = {
            id: itemCount+1,
            title:newTask,

        };
        setTasks([...tasks,new_task]);
        setNewTask("");
        setItemCount((prev) => prev+1);
    }
    //structure
  return (
    <Container>
        <Heading> Todo List</Heading>
        <ToDoContainer>
            <SubHeading>Things to be done</SubHeading>
            <ToDoList> {renderTasks()} </ToDoList>
        </ToDoContainer>
        <NewToDoForm>
            <FormInput
             placeholder =" Type New Task"
             value={newTask}
             onChange={(e) => setNewTask(e.target.value)}
             />
            <FormSubmitButton
               onClick={ (e)=>{addNewTask(e)}}>
            Add New</FormSubmitButton>
        </NewToDoForm>
        <ToDoContainer>
            <SubHeading>Things to be done</SubHeading>
            <ToDoList>
                {renderCompleted()}  
            </ToDoList>
        </ToDoContainer>
    </Container>
  )
}
export default ToDo;
//cssssssssssssssssssssssss
const Container = styled.div`
    width : 90%auto;
    max-width:1000px;
    padding: 50px 10%;
    border-left: 2px solid #f5f5f5;
    border-right: 2px solid #f5f5f5;
    margin: 0 auto;
    

`;
const Heading = styled.h1`
    font-size:52px;
    font-weight:bold;
    text-align:center;
    margin-bottom:40px;
`;
const SubHeading = styled.h3`
    font-size: 36px;
    color: #050241;
`;
const ToDoContainer = styled.div``;
const ToDoList = styled.ul`
    
`;
const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
    `;
    
const LeftContainer = styled.div`
    display:flex;
    align-items:center;    
`;
const CheckContainer = styled.span`
    width:32px;
    height:32px;
    border-radius:50%;
    border:2px solid #050241;
    display:inline-block;
    margin-right:15px;
    cursor:pointer;   
`;
const Itemcontant = styled.span`
    cursor:pointer;
    font-size:28px;

`;
const ActionButton = styled.button`
    border:none;
    background:none;
    cursor:pointer;
    margin-right:20px;
    outline none;
    &:last-child{
        margin-right:0;
    }
`;
const ButtonImage = styled.img``;
const RightContainer = styled.div`
    display:flex;
`;
const NewToDoForm = styled.form`
    display:flex;
    margin-left:40px;
    margin-top:30px;
    position:relative;
    &::before{
        content:"";
        background-image:url(${require("./assets/plus.svg").default});
        width:16px;
        height:16px;
        display:vlock;
        position:absolute;
        left:10px;
        top:0;
        bottom:0;
        margin:auto 0;
        z-index:2;
    }
`;
const FormInput = styled.input`
    display:block;
    width:100%;
    outline:none;
    border:1px solid #c6c6c6;
    border-right:none;
    padding:0 10px 0 35px;
    font-size:22px;

     
`;
const FormSubmitButton = styled.button`
    padding:15px 25px;
    white-space:nowrap;
    border:none;
    background:#050241;
    color:#fff;
    cursor:pointer;
    border-radius:6px;
    border-top-left-radius:0;
    border-bottom-left-radius:0;

`;
const CheckContainerCompleted = styled(CheckContainer)`
    display:flex;
    justify-content:center;
    align-items:center;
    border-color:#06c692;
`;
const ItemcontantCompleted = styled(Itemcontant)`
    color:#06c692; 
`;
const Tickimage = styled.img``;









