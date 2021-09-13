// import axios from "axios";

import React, { Component } from "react";

class Upload extends Component {
  render() {
    return (
      <div>
        <h3>Upload Portfolio EXCEL file</h3>
        <div>
          <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">upload</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Upload;
