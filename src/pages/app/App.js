// import logo from './logo.svg';
import './App.css';

function App() {
  
  let dataSplit
  
    const fileUrl = '/view_text_file.php?filename=4100452023.txt.gz&dir=data/stdmet/May/'
    // console.log(fileUrl)
    fetch(fileUrl)
    // fetch(fileUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(fileContent => {
      // Process the file content here
     
      const dataString = fileContent.split('\n')
      console.log(dataString[0])
      console.log(dataString[1])
      dataSplit = dataString[2].split(' ')
      console.log(dataSplit)

     
      // You can save the file content to a variable or use it as needed
      // For example, you can pass it to another function for further processing
      // yourFunctionToProcessFileContent(fileContent);
    })
    .catch(error => {
      console.error('Error reading the file:', error);
    });
     
   

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Hello from SurfLog
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
