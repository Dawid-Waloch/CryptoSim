import { describe, it, expect } from "vitest";
import { customRender, screen } from "../../tests/test-utils";
import Navbar from "./Navbar";
import { AuthContext } from "../../context/AuthContext";

describe('Navbar Component', () => {
    const mockUser = {
        username: 'dawid',
        userId: 1,
        email: 'dawidw@wp.pl'
    };

    it('renders navbar for non logged user', () => {
        customRender(
            <AuthContext.Provider value={{ user: null }}>
                <Navbar />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('renders navbar for logged user', () => {
        customRender(
            <AuthContext.Provider value={{ user: mockUser }}>
                <Navbar />
            </AuthContext.Provider>
        );

        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Market')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
    });
});