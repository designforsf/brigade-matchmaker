import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

/*beforeEach(function() {

  global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          Id: '123',
          json: function() {
            return {Id: '123'}
          }
        });
      });

      return p;
  });

});*/

beforeEach(function() {
  fetch.mockResponses(JSON.stringify([]));
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
