'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .max(32, 'Password cannot exceed 32 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
    const { loginWithEmail } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await loginWithEmail(data.email, data.password);
            // Redirect or perform other actions on successful login
        } catch (err) {
            console.error('Login Failed:', err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mb-6"
        >
            {/* Email Field */}
            <div>
                <input
                    type="email"
                    {...register('email')}
                    placeholder="Email"
                    className="px-4 py-2 border rounded w-full"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password Field */}
            <div>
                <input
                    type="password"
                    {...register('password')}
                    placeholder="Password"
                    className="px-4 py-2 border rounded w-full"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white font-medium rounded shadow hover:bg-blue-600 transition ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Logging in...' : 'Login with Email'}
            </button>
        </form>
    );
};

export default LoginForm;
