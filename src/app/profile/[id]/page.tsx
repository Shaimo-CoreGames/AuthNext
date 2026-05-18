// Define an interface for your TypeScript props to keep it clean
interface ProfileProps {
    params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: ProfileProps) {
    // 1. Unwrap the params promise using 'await'
    const resolvedParams = await params; 

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl p-7">Profile Page</h1>
            <hr />
            <p className="text-4xl">
                Profile id: 
                {/* 2. Access the id from the safely unwrapped object */}
                <span className="p-2 ml-2 rounded bg-orange-500 text-black">
                    {resolvedParams.id}
                </span>
            </p>
        </div>
    );
}