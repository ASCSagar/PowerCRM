import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import MeterDetailGas from "./MeterDetail/MeterDetail(Gas)";
import MeterDetailElectricity from "./MeterDetail/MeterDetail(Electricity)";
import CurrentSupplyGas from "./CurrentSupply/CurrentSupply(Gas)";
import CurrentSupplyElectricity from "./CurrentSupply/CurrentSupply(Electricity)";
import NewSupplyGas from "./NewSupply/NewSupply(Gas)";
import NewSupplyElectricity from "./NewSupply/NewSupply(Electricity)";

const SupplyDetails = () => {
  return (
    <div>
      <Tabs>
        <Tab className="mt-3" eventKey={1} title="Meter Details (GAS)">
          <MeterDetailGas />
        </Tab>
        <Tab className="mt-3" eventKey={2} title="Current Supplies (GAS)">
          <CurrentSupplyGas />
        </Tab>
        <Tab className="mt-3" eventKey={3} title="New Supplies (GAS)">
          <NewSupplyGas />
        </Tab>
        <Tab className="mt-3" eventKey={4} title="Meter Details (ELECTRICITY)">
          <MeterDetailElectricity />
        </Tab>
        <Tab
          className="mt-3"
          eventKey={5}
          title="Current Supplies (ELECTRICITY)"
        >
          <CurrentSupplyElectricity />
        </Tab>
        <Tab className="mt-3" eventKey={6} title="New Supplies (ELECTRICITY)">
          <NewSupplyElectricity />
        </Tab>
      </Tabs>
    </div>
  );
};

export default SupplyDetails;
