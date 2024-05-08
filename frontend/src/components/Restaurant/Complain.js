import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminDashboard from "../../components/AdminDashboard";
import { Table, Button, Checkbox, Badge } from "antd";
import { DeleteOutlined, BellOutlined } from "@ant-design/icons";

const AllSuppliers = () => {
    const [complains, setComplains] = useState([]);
    const [selectedCount, setSelectedCount] = useState(0); // State to track selected complaints count

    const id = useParams().id;

    useEffect(() => {
        getComplains();
    }, [id]);

    useEffect(() => {
        // Update notification count whenever complains change
        setSelectedCount(complains.filter(complain => complain.selected).length);
    }, [complains]);

    const getComplains = () => {
        axios.get("http://localhost:8000/complain/")
            .then((res) => {
                setComplains(res.data.map(complain => ({ ...complain, selected: false })));
            })
            .catch((err) => {
                console.error("Error fetching complains:", err);
                alert("Failed to fetch complains. Please try again.");
            });
    }

    const deleteHandler = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/complain/delete/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete complaint");
            }

            // If deletion is successful, update the complain list
            getComplains();
        } catch (error) {
            console.error("Error deleting complaint:", error);
            alert("Failed to delete complaint. Please try again.");
        }
    }

    const handleSelect = (id) => {
        setComplains(complains.map(complain =>
            complain._id === id ? { ...complain, selected: !complain.selected } : complain
        ));
    }

    const columns = [
        {
            
            key: 'select',
            width: '10%',
            render: (text, record) => (
                <Checkbox onChange={() => handleSelect(record._id)} checked={record.selected} />
            ),
        },
        {
            title: 'Complaints',
            dataIndex: 'complain',
            key: 'complain',
            width: '70%',
        },
        {
            title: 'Action',
            key: 'action',
            width: '20%',
            render: (text, record) => (
                <Button type="danger" icon={<DeleteOutlined />} onClick={() => deleteHandler(record._id)}>
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="row">
                <div className="col-12 col-md-2">
                    <AdminDashboard />
                </div>
                <div className="container" style={{ width: '80%' }}>
                    <div className="container">
                        <div className="heading"><br/><h3>Complaints</h3></div>
                        <div style={{ position: 'absolute', top: '30px', right: '30px' }}>
                            <Badge count={selectedCount} overflowCount={99}>
                                <BellOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                            </Badge>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={complains}
                            rowKey="_id"
                            locale={{
                                emptyText: <span>No Result Found</span>,
                            }}
                        />
                        <div className="report_btn mt-2 mb-2">
                            <NavLink to="/complains/rprint" className="btn btn-primary"> Generate Report </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllSuppliers;
