import React from 'react';
import ReactDOM from 'react-dom/client';

// Import our custom CSS
import './scss/styles.scss';

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';


export default function App() {

  const [threadNetworkNameText, onChangeThreadNetworkNameText] = React.useState('NEST-PAN-F15F');
  const [threadOperationalDatasetText, onChangeThreadOperationalDatasetText] = React.useState('');

  const [matterLongDiscriminatorText, onChangeMatterLongDiscriminatorText] = React.useState('3840');
  const [matterPasscodeText, onChangeMatterPasscodeText] = React.useState('20202021');
  

  const commissionButtonClickAsync = async (): Promise<void> => {
    console.log('commissionButtonClickAsync() async');

    console.log(`threadNetworkNameText ` + threadNetworkNameText);
    console.log(`threadOperationalDatasetText ` + threadOperationalDatasetText);
    console.log(`matterLongDiscriminatorText ` + matterLongDiscriminatorText);
    console.log(`matterPasscodeText ` + matterPasscodeText);

    const _result = await window.electronAPI.handleMatter(
      threadNetworkNameText,
      threadOperationalDatasetText,
      parseInt(matterLongDiscriminatorText),
      parseInt(matterPasscodeText)
    );
  }

  return (
    <div>
      <form>
          
        <div className="container text-center">
          <div className="row align-items-start">
            <div className="col">
              <h2>Thread Network Settings</h2>
              <div className="mb-3">
            <label htmlFor="threadNetworkName" className="form-label">Thread Network Name</label>
            <input
              type="text"
              id="threadNetworkName"
              name="threadNetworkName"
              placeholder="NEST-PAN-F15F"
              className="form-control"
              value={threadNetworkNameText}
              onChange={(e) => {onChangeThreadNetworkNameText(e.target.value)}}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="threadOperationalDataset" className="form-label">Thread Operational Dataset</label>
            <input
              type="password"
              id="threadOperationalDataset"
              name="threadOperationalDataset"
              placeholder="000300001a0102f15f020807e5b1372eb688120e080000633d8c5ca8e90510f760d45b8c76f77b51529113fb146ab2030d4e4553542d50414e2d463135460708fd2da0c1435c00000410e77a14cb64f066942a6a37c236c237380c0402a0f77835060004001fffe0"
              className="form-control"
              value={threadOperationalDatasetText}
              onChange={(e) => {onChangeThreadOperationalDatasetText(e.target.value)}}
              />
          </div>
            </div>
            <div className="col">
              <h2>WiFi Network Settings</h2>
              <div>TODO</div>
            </div>
          </div>
        </div>

        <h2>Matter Device Parameters</h2>
        <div className="mb-3">
          <label htmlFor="longDiscriminator" className="form-label">Long Discriminator</label>
          <input
            type="text"
            id="longDiscriminator"
            name="longDiscriminator"
            placeholder="3840"
            className="form-control"
            value={matterLongDiscriminatorText}
            onChange={(e) => {onChangeMatterLongDiscriminatorText(e.target.value)}}
          />
        <label htmlFor="passcode" className="form-label">Passcode</label>
        <input
          type="password"
          id="passcode"
          name="passcode"
          placeholder="20202021"
          className="form-control"
          value={matterPasscodeText}
          onChange={(e) => {onChangeMatterPasscodeText(e.target.value)}}
          />
        </div>
        <div>
          <button  type='button' onClick={commissionButtonClickAsync} className="btn btn-primary">Commission</button>
        </div>
      </form>
    </div>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <App />
    );
}
