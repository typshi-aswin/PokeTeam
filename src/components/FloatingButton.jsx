import { useNavigate } from 'react-router-dom';
import logo from '/logo.png'; 
import '../styles/floatingButton.css'; 
function FloatingButton() {
   const navigate = useNavigate();
   const handleClick = () => {
     navigate('/teampage');
   };

    return (
        
        <button className="floating-button" onClick={handleClick}>
            <img src={logo} alt="Go to Team Page" />
        </button>
       
        
        );

}
export default FloatingButton;
