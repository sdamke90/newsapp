import React, { Component } from 'react';

import Searchbar from "./Components/searchbar";
import Category from "./Components/category";
import Newsfeed from "./Components/newsfeed";
import Footer from "./Components/footer";

class App extends Component {
  render() {
    return (
      <div>
        <Searchbar />
        <Category />
        <Newsfeed />
        <Footer />
      </div>
    );
  }
}

export default App;
