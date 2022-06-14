import React, {useState} from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';


const AIResult = () => {
  <Link to="/ai/result">AI</Link>

  return (
    <div>
      <form>
        <input type="file" accept="image/*" onChange={onLoadFile} />
      </form>

      <form>
        <button onClick={handleClick}>보내기</button>
      </form>
    </div>

  );
};

export default AI;