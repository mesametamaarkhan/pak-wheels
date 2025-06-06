// Database
import connectDB from "@/db/connectDB";

// Models
import Car from "@/models/Car";

// Next.js
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        console.log("Fetching cars for rental by owner with ID:", params.id);
        await connectDB();
        const cars = await Car.find({ ownerId: params.id, isForRent: true })
            .populate("ownerId", "name email phoneNumber");

        if(!cars) {
            return NextResponse.json({ message: 'Cars not found' },  { status: 404 });
        }
        return NextResponse.json({ cars }, { status: 200 });
    }
    catch(error: unknown) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
        
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
};