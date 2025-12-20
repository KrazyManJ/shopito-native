import ShopitoRepository from "@/repositories/shopito_repository";
import { openDatabaseAsync } from "expo-sqlite";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

const RepositoryContext = createContext<ShopitoRepository | null>(null);

export const RepositoryProvider = ({ children }: { children: ReactNode }) => {
    const [repository, setRepository] = useState<ShopitoRepository | null>(
        null
    );

    useEffect(() => {
        const init = async () => {
            const db = await openDatabaseAsync("shopito");
            
            const repo = new ShopitoRepository(db);
            await repo.init()

            setRepository(repo);
        };
        init();
    }, []);

    if (!repository) return null;

    return (
        <RepositoryContext.Provider value={repository}>
            {children}
        </RepositoryContext.Provider>
    );
};

export const useRepository = () => {
    const context = useContext(RepositoryContext);
    if (!context)
        throw new Error("useServices must be used within ServiceProvider");
    return context;
};
