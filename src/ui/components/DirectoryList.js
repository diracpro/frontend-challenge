import MaterialTable from "material-table";
const directoryUrl = "https://e6di35qzm7.execute-api.us-west-2.amazonaws.com/latest/directory";
export default function DirectoryList({ offerList, ...props }) {
    log.debug("Here is your offers list", offerList);
    
    const [offerData, setOfferData] = useState({});
    useEffect(() => {
        getOfferDataWithFetch();
    }, []);
    const getOfferDataWithFetch = async () => {
        fetch(directoryUrl)
        .then(response => response.json())
        .then(data => setOfferData(data.data))
        .catch(e => { log.debug(e); });
    };
        
    const arrayNames = Object.values(offerData).map(item => item.name);
    const arrayDiscounts =  Object.values(offerData).map(item => item.discount);
    var objectNames = arrayNames.map(arrayNames => ({name: arrayNames}));
    var objectDiscounts = arrayDiscounts.map(arrayDiscounts => ({discount: arrayDiscounts}));
    var arrayOfObjects = objectNames.map(function (value, index){
       return [value, objectDiscounts[index]]
    });
    var directory = [];
    arrayOfObjects.forEach(async arrayOf => {
        directory.push(arrayOf.reduce(((r, c) => Object.assign(r, c)), {}));
    });
        
    return (
        <div className="App">
            <header className="App-header"></header>
            <div className="App">
                <MaterialTable
                columns={[
                    { title: "Name", field: "name" },
                    { title: "Discount", field: "discount" },
                ]}
                data={ directory }
                title="OFFERINGS"
                options={{
                    isloading: true,
                    exportButton: true,
                    pageSize: 10,
                    pageSizeOptions: [5,10,20,100]
                  }}
                />
            </div>
        </div>
    );
}