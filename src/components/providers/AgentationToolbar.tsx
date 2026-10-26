"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Agentation = dynamic(
    () => import("agentation").then((mod) => mod.Agentation as unknown as React.ComponentType<{ endpoint?: string }>),
    { ssr: false }
);

export function AgentationToolbar() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (process.env.NODE_ENV !== "development" || !mounted) {
        return null;
    }

    return <Agentation endpoint="http://localhost:4747" />;
}
