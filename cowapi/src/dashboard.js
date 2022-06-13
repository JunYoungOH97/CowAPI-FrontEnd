import React, { useState, useEffect } from 'react';
import { fetchEventSource } from "@microsoft/fetch-event-source";
import styles from "./dashboard.module.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [apiName, setApiName] = useState(null);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          await fetchEventSource(
            `server/dashboard`, 
            {method: "GET",
            headers: {Accept: "text/event-stream",},

            onopen(res) {
              if (res.ok && res.status === 200) {
                console.log("Connection made ", res);
              } else if (
                res.status >= 400 &&
                res.status < 500 &&
                res.status !== 429
              ) {
                console.log("Client side error ", res);
              }
            },

            onmessage(event) {
              const parsedData = JSON.parse(event.data);
              setDashboard(parsedData);
            
              const parseName = event.id;
              setApiName(parseName);
            },

            onclose() {
              console.log("Connection closed by the server");
            },

            onerror(err) {
              console.log("There was an error from server", err);
              setError(err);
            },});
        };

        fetchData();
      }, []);

    if (error) return <div>에러가 발생했습니다</div>;
    if (!dashboard) return null;
    
    return (
        <div>

        <h1>Dashboard</h1>

        <div style={styles}>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.service} rowSpan="2">서비스</td>
                            <td>오늘 회원가입 수</td>
                            <td>총 회원수</td>
                        </tr>
                        <tr>
                            <td>{dashboard.todayUser}</td>
                            <td>{dashboard.totalUser}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th colspan="4">API status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>API</td>
                            <td>TPS</td>
                            <td>Response Time</td>
                            <td>Update Time</td>
                        </tr>
                        <tr>
                            <td>{apiName}</td>
                            <td>{dashboard.todayTps}</td>
                            <td>{dashboard.responseTime}</td>
                            <td>{dashboard.updatedTime}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;