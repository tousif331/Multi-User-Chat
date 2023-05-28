import { Formik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {

    const navigate = useNavigate();

    const loginSubmit = async (formdata, { resetForm }) => {
        console.log(formdata)
        resetForm();

        const response = await fetch('http://localhost:5000/user/authenticate', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Logedin'
            })

            const data = await response.json();
            sessionStorage.setItem('user', JSON.stringify(data));
            navigate('/chat/'+data.name)


        } else if ((response.status === 401)) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed'
            })
        } else {
            console.log('unknown error ocuured');
        }

        // data to store in database
    }

    return (
        <>
            <section className=' vh-100' style={{ backgroundColor: 'gray', scrollbar: 'none' }}>
                <div className='container h-1000' >
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='col-lg-12 col-xl-11'>
                            <div className='card text-black mt-5' style={{ borderRadius: '25px' }}>
                                <div className='card-body p-md-5'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-10 col-lg-6 col-xl-5 order-2'>

                                            <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                                            <Formik
                                                initialValues={{ email: '', password: '' }}
                                                onSubmit={loginSubmit}
                                            >
                                                {({ values, handleSubmit, handleChange }) => (


                                                    <form onSubmit={handleSubmit}>

                                                        <div className='d-flex flex-row align-items-center mb-4'>
                                                            <i className='fa fa-envelope fa-lg me-3 fa-fw'></i>
                                                            <input type="mail" className='form-control' placeholder='Your Email' name='email' onChange={handleChange} value={values.email} />
                                                        </div>

                                                        <div className='d-flex flex-row align-items-center mb-4'>
                                                            <i className='fa fa-lock fa-lg fa-fw me-3'></i>
                                                            <input type="password" className="form-control" id="" placeholder='Password' name='password' onChange={handleChange} value={values.password} />
                                                        </div>


                                                        <div className=' form-check d-flex justify-content-center mb-4'>
                                                            <input type="checkbox" className='form-check-input me-2' />
                                                            <label htmlFor="" className='form-check-label'>I agree all statemnet in <a href="#">Terms and
                                                                condition</a></label>
                                                        </div>

                                                        <div className='d-flex justify-content-center mb-4'>
                                                            <button type='submit' className='btn btn-primary btn-lg'>Signin</button>
                                                        </div>
                                                    </form>

                                                )}
                                            </Formik>

                                        </div>
                                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
                                                alt="Sample" className='img-fluid h-100' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

export default Signup;