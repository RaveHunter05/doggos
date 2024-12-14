import ConnectWalletButton from '@/components/ConnectWalletButton';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="h-screen w-screen bg-blue-300 flex flex-col items-center justify-center">
            <Image
                src="/doggo.jpg"
                alt="dog"
                width={100}
                height={100}
                className="rounded-full overflow-hidden bg-gray-200 p-1"
            />
            <h1 className="text-4xl font-bold text-center mt-3">
                Welcome to the doggos app!
            </h1>

            <div className="mt-5">
                <ConnectWalletButton />
            </div>
        </div>
    );
}
