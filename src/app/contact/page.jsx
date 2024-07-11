"use client"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import emailjs from '@emailjs/browser';

const ContactPage = () => {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const text = "Say Hello"
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setError(false)
        setSuccess(false)
        setLoading(true)
        emailjs
            .sendForm(
                "service_vvyqrdr", 
                "template_xqtrpbt", 
                form.current, 
                "EOBH7ZK-A36ArBXir"
            )
            .then(
                (result) => {
                   setSuccess(true);
                   setLoading(false)
                   form.current.reset()
                },
                (error) => {
                    setError(true)
                    setLoading(false)
                },
            );
    };

    return (
        <motion.div className='h-full' initial={{ y: "-200vh" }} animate={{ y: "0%" }} transition={{ duration: 1 }}>
            <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
                {/* TEXT CONTAINER  */}
                <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-6xl">
                    <motion.div>
                        {text.split("").map((letter, index) => (
                            <motion.span
                                key={index}
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: index * 0.1
                                }}>
                                {letter}
                            </motion.span>
                        ))}
                        🧑‍💻
                    </motion.div>
                </div>
                {/* FORM CONTAINER  */}
                <form onSubmit={sendEmail} ref={form} className="h-1/2 lg:h-full lg:w-1/2 bg-gray-50 rounded-xl text-xl flex flex-col gap-8 justify-center p-24">
                    <span>Dear ..., </span>
                    <textarea name="user_message" placeholder="Escreva aqui..." rows={6} className="bg-transparent border-b-2 border-b-black outline-none resize-none" />
                    <span>My mail address is:</span>
                    <input name="user_email" type="text" placeholder="Seu email..." className="bg-transparent border-b-2 border-b-black outline-none" />
                    <button className="bg-purple-200 rounded font-semibold text-gray-600 p-4" disabled={loading}>
                        {loading ? "Sending..." : "Send"}
                    </button>
                    {success && <span className="text-green-600 font-semibold">Your message has been successfully sent!</span>}
                    {error && <span className="text-red-600 font-semibold">Something went wrong!</span>}
                </form>
            </div>
        </motion.div>
    )
}

export default ContactPage
