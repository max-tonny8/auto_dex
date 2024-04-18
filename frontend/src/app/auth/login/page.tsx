import { Login } from "@/components/Auth/login";

export default function LoginPage() {
    return (
        <section className="relative w-full h-full min-h-screen">
            <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full inset-0"
            style={{
                backgroundImage: "url('/img/wave_pattern.png')",
                backgroundPosition: 'center',
                opacity: 0.1,
                backgroundSize: 'cover',      
            }}
            ></div>
        
            <Login />
        </section>
    );
  }
  