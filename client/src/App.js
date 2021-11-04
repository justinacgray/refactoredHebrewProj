import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import Register from "./components/RegLogIn/Register";
import Login from "./components/RegLogIn/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DisplayHebrew from "./components/Hebrew/DisplayHebrew";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import CreateListForm from "./components/Hebrew/CreateListForm";
import DisplayListItems from "./components/Hebrew/DisplayListItems";

function App() {
    const [user_id, setUser_Id] = useState("");
    const [listId, setListId] = useState("");
    return (
        <div className="App">
            <NavBar default />
            <Router>
                <Home path="/" />
                <Register setUser_Id={setUser_Id} path="/user/register/" />
                <Login setUser_Id={setUser_Id} path="/user/login/" />
                <Dashboard setListId={setListId} path="/dashboard/" />
                <DisplayHebrew path="/displayhebrew/" />
                <CreateListForm path="/lists/new" />
                <DisplayListItems path="/lists/:id" />
            </Router>
        </div>
    );
}

export default App;
