export interface UserRegistration {
    provider?: string;
    providerAccountId?: string;
    role: string;
    fullName: string;
    email: string;
    image: string;
    password: string;
}

// provider,
    // providerAccountId,
    // email,
    // name,
    // image,
    // role: "user",