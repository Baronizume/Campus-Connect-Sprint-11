import { useState } from "react";

function StudentRegistration({ onLogin }) {
    const initialForm = {
        name: "",
        studentId: "",
        email: "",
        phone: "",
        department: "",
        year: "",
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }

        setSuccess("");
        setServerError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Full name is required.";
        } else if (form.name.trim().length < 3) {
            newErrors.name = "Name must contain at least 3 characters.";
        }

        if (!form.studentId.trim()) {
            newErrors.studentId = "Student ID is required.";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!form.phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(form.phone)) {
            newErrors.phone = "Phone number must contain 10 digits.";
        }

        if (!form.department) {
            newErrors.department = "Please select a department.";
        }

        if (!form.year) {
            newErrors.year = "Please select your year.";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateForm();

        setErrors(newErrors);
        setSuccess("");
        setServerError("");

        if (Object.keys(newErrors).length !== 0) {
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/students",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        studentId: form.studentId,
                        course: form.department,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Registration failed."
                );
            }

            console.log("Student registered:", data.student);

            setSuccess(
                "Student registered successfully! You can now login."
            );

            setForm(initialForm);
        } catch (error) {
            console.error("Registration error:", error);

            setServerError(
                error.message || "Unable to connect to the server."
            );
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setErrors({});
        setSuccess("");
        setServerError("");
    };

    return (
        <div className="container">
            <h1>🎓 Student Registration</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Full Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                />

                {errors.name && (
                    <p className="error">{errors.name}</p>
                )}

                <label htmlFor="studentId">
                    Student ID
                </label>

                <input
                    id="studentId"
                    name="studentId"
                    type="text"
                    value={form.studentId}
                    onChange={handleChange}
                    placeholder="Enter your student ID"
                />

                {errors.studentId && (
                    <p className="error">
                        {errors.studentId}
                    </p>
                )}

                <label htmlFor="email">
                    Email
                </label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                {errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <label htmlFor="phone">
                    Phone Number
                </label>

                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    maxLength="10"
                />

                {errors.phone && (
                    <p className="error">{errors.phone}</p>
                )}

                <label htmlFor="department">
                    Department
                </label>

                <select
                    id="department"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Department
                    </option>

                    <option value="Computer Science">
                        Computer Science
                    </option>

                    <option value="Information Technology">
                        Information Technology
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>
                </select>

                {errors.department && (
                    <p className="error">
                        {errors.department}
                    </p>
                )}

                <label htmlFor="year">
                    Year
                </label>

                <select
                    id="year"
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                >
                    <option value="">
                        Select Year
                    </option>

                    <option value="1st Year">
                        1st Year
                    </option>

                    <option value="2nd Year">
                        2nd Year
                    </option>

                    <option value="3rd Year">
                        3rd Year
                    </option>

                    <option value="4th Year">
                        4th Year
                    </option>
                </select>

                {errors.year && (
                    <p className="error">
                        {errors.year}
                    </p>
                )}

                <div className="buttons">
                    <button type="submit">
                        Register
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

                {success && (
                    <p className="success">
                        {success}
                    </p>
                )}

                {serverError && (
                    <p className="error">
                        {serverError}
                    </p>
                )}

                {onLogin && (
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "15px",
                        }}
                    >
                        <span>
                            Already have an account?
                        </span>

                        <button
                            type="button"
                            className="register-link"
                            onClick={onLogin}
                        >
                            Login
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default StudentRegistration;
