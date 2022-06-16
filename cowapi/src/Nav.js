import React from 'react';
import {Link} from 'react-router-dom';

export const Nav = () => {
    return (
        <nav>
            <ul>
              <li>
                <Link to="/">대시보드</Link>
              </li>

              <li>
                <Link to="/ai">AI</Link>
              </li>

              <li>
                <Link to="/QnAs">QnA</Link>
              </li>

              <li>
                <Link to="/notices">Notice</Link>
              </li>
            </ul>

            <hr />
        </nav>
    );
}