import { useState, useEffect } from "react";
function App() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([])

  const fetchData =()=>{
    fetch(`https://jsonplaceholder.typicode.com/todos?_start=${page}&_limit=30`)
    .then(response => response.json())
    .then(json =>{
      setData([...data, ...json])
    })
}
  useEffect(()=>{
    fetchData()
  }, [page]);

  const handleIntersection = (entries) => {
    if(entries[entries.length-1].isIntersecting){
        setPage(page+1)
    }
  }

  const renderTitle = () => {
    const titles = document.querySelectorAll('.titles');
    const observer = new IntersectionObserver(handleIntersection);
    titles.forEach((val, index) => {
        if(index===titles.length-1){
            observer.observe(val)
        }
    });
    return data.map(({title})=><p class="titles">{title}</p>)
}

  return (
    <div className="App">
      {
        data.length?renderTitle():''
      }
    </div>
  );
}

export default App;
