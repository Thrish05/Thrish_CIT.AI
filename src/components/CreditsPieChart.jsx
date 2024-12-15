/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const CreditsPieChart = () => {
    const [departments] = useState([
        { id: 1, name: "CSE" },
        { id: 2, name: "IT" },
        { id: 3, name: "AIDS" },
        { id: 4, name: "AIML" },
        { id: 5, name: "CyberSecurity" },
        { id: 6, name: "CSBS" },
        { id: 7, name: "MECH" },
        { id: 8, name: "MCT" },
        { id: 9, name: "ECE" },
        { id: 10, name: "EEE" },
        { id: 11, name: "VLSI" },
        { id: 12, name: "BME" },
        { id: 13, name: "ACT" },
        { id: 14, name: "CIVIL" },
    ]);

    const [selectedDept, setSelectedDept] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [creditsData, setCreditsData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        if (selectedDept && selectedSemester) {
            fetchCredits(selectedDept, selectedSemester);
        }
    }, [selectedDept, selectedSemester]);

    useEffect(() => {
        return () => {
            if (chartRef.current && chartRef.current.chart) {
                chartRef.current.chart.destroy();
            }
        };
    }, [creditsData]);

    const fetchCredits = async (deptName, semester) => {
        try {
            const response = await axios.get('http://localhost:5000/api/credits', {
                params: { department: deptName, semester: semester },
            });
            setCreditsData(response.data || []);
        } catch (err) {
            console.error('Error fetching credits:', err);
        }
    };

    // Prepare data for the Pie chart
    const pieData = {
        labels: creditsData.map((item) => item.category),
        datasets: [
            {
                label: 'Percentage (%)',
                data: creditsData.map((item) => item.percentage),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Department Credits Pie Chart</h1>
            <select onChange={(e) => setSelectedDept(e.target.value)} value={selectedDept}>
                <option value="">Select a Department</option>
                {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                        {dept.name}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setSelectedSemester(e.target.value)} value={selectedSemester}>
                <option value="">Select a Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                        Semester {sem}
                    </option>
                ))}
            </select>

            {creditsData.length > 0 && (
                <div
                    style={{
                        width: '350px',
                        height: '350px',
                        margin: '20px auto',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        backgroundColor: '#f9f9f9',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    <Pie
                        ref={chartRef}
                        data={pieData}
                        options={{
                            maintainAspectRatio: false,
                            responsive: true,
                        }}
                        style={{ width: '300px', height: '300px', margin: '0 auto' }}
                    />
                </div>
            )}

            {creditsData.length === 0 && selectedDept && selectedSemester && (
                <p>No data available for the selected department and semester.</p>
            )}
        </div>
    );
};

export default CreditsPieChart;