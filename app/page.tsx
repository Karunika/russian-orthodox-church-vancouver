import Carousel from './_components/Carousel';
import DonationPanel from './_components/DonationPanel';
import ServiceSchedule from './_components/ServiceSchedule';
import Welcome from './_components/Welcome';

const App: React.FC = () => {
    return (
        <>
            <Carousel />
            <ServiceSchedule />
            <Welcome />
            <DonationPanel />
        </>
    );
};

export default App;
