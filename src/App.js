import DirectoryList from "ui/components/DirectoryList";

const fetchOffersList = () => {
    return [];
};

export default function App() {
    return (
        <>
            <DirectoryList offerList={fetchOffersList()} />
        </>
    );
}
