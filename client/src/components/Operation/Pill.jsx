const Pill = ({ image, text, onClick , i }) => {
    return (
      <span
        className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-full text-sm cursor-pointer relative"
        onClick={onClick}
      >
        {/* <img src={image} alt={text} className="h-5 w-5 rounded-full object-cover" /> */}
        <span className="flex absolute bg-primary rounded-full text-[10px] h-4 text-center w-4 -top-2 -right-1 ">
            <div className=" justify-center items-center -translate-y-[1.5px] w-full">
                {i+1}
            </div>
        </span>
        <span>{text} &times;</span>
      </span>
    );
  };
  
  export default Pill;