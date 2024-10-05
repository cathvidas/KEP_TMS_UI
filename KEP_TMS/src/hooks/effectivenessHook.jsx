import effectivenessService from "../services/effectivenessService";

const effectivenessHook = {
    useEffectivenessById: (id) => {
        const [data, setData] = useState([]);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            const getRequest = async () => {
                handleResponseAsync(() => effectivenessService.getEffectivenessById(id), (e) => setData(e), (e) => setError(e));
                setLoading(false);
            }
            getRequest();
        }, [])
        return {
            data, error, loading
        }
    }
}
export default effectivenessHook;