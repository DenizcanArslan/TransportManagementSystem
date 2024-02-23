import {useEffect} from "react";


const DropdownSpan = ({buttonText}) => {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);


  return (
    <span className='nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {buttonText}
    </span>
  )
}

export default DropdownSpan