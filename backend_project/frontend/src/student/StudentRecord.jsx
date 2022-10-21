import { useState, useEffect } from "react";
import RecordAPI from "../api/RecordAPI";

const StudentRecord = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");
    const [grade, setGrade] = useState("");
    const [detailsId, setDetailsId] = useState(null);
    const [details, setDetails] = useState([]);

    useEffect(() => {
        refreshRecords();
    }, []);

    const refreshRecords = () => {
        RecordAPI.get("/")
            .then((res) => {
                setDetails(res.data);
            })
            .catch(console.error);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        let item = { name, subject, marks, grade };
        RecordAPI.post("/", item).then(() => refreshRecords());

        setName('');
        setSubject('');
        setMarks('');
        setGrade('');
    };

    const onUpdate = (id) => {
        let item = { name, subject, marks, grade };
        RecordAPI.patch(`/${id}/`, item).then((res) => refreshRecords());

        setName('');
        setSubject('');
        setMarks('');
        setGrade('');
    };

    const onDelete = (id) => {
        RecordAPI.delete(`/${id}/`).then((res) => refreshRecords());
    };

    const onReset = (e) => {
        setName('');
        setSubject('');
        setMarks('');
        setGrade('');
    }

    function selectRecord(id) {
        let item = details.filter((detail) => detail.id === id)[0];
        setName(item.name);
        setSubject(item.subject);
        setMarks(item.marks);
        setGrade(item.grade);
        setDetailsId(item.id);
    }

    return (
        <div className="container mt-5">
            <div className="row">

                <div className="col-md-8 mt-5">
                    <h3 className="text-center">Student Record List</h3>
                    <table class="table table-hover table-bordered border-warning">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col"> Name</th>
                                <th scope="col">Subject</th>
                                <th scope="col">Marks</th>
                                <th scope="col">Grade</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((detail, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{detail.id}</th>
                                        <td> {detail.name}</td>
                                        <td>{detail.subject}</td>
                                        <td>{detail.marks}</td>
                                        <td>{detail.grade}</td>
                                        <td>
                                            <button
                                                className="fa fa-pencil mx-2 btn btn-info"
                                                aria-hidden="true"
                                                onClick={() => selectRecord(detail.id)}
                                            ></button>
                                            <button
                                                className="fa fa-trash-o mx-2 btn btn-danger"
                                                aria-hidden="true"
                                                onClick={() => onDelete(detail.id)}
                                            ></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="col-md-4 mt-5">
                    <h3 className="float-left">Create a new student record</h3>
                    <form onSubmit={onSubmit} className="mt-4">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            placeholder="Enter Subject"
                            className="form-control"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <label className="form-label">Marks</label>
                        <input
                            type="text"
                            placeholder="Enter Marks"
                            className="form-control"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />

                        <label className="form-label">Grade</label>
                        <input
                            type="text"
                            placeholder="Enter Grade"
                            className="form-control"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                        />

                        <div className="float-right">

                            <button
                                variant="primary"
                                type="button"
                                onClick={onReset}
                                className="mx-2 btn btn-warning mt-3 float-end"
                            >
                                Reset
                            </button>
                            <button
                                variant="primary"
                                type="button"
                                onClick={() => onUpdate(detailsId)}
                                className="mx-2 btn btn-info mt-3 float-end"
                            >
                                Update
                            </button>
                            <button
                                variant="primary"
                                type="submit"
                                onClick={onSubmit}
                                className="mx-2 btn btn-primary mt-3 float-end"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentRecord;