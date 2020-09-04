Simple network manager that allows you to monitor networked devices in real time, as well as scan
network for the presence of devices, remotely turn on devices via wakeOnLan technology, as well as remotely execute various bash scripts
via ssh, or create ssh sessions.
<br />
The application contains three tabs, you can switch between them using the buttons:
SINGLE_MACHINE,<br />
CURRENT_NETWORK,<br />
IP_TABLES
<br />
<br />

Short description of tabs: <br />


1.SINGLE_MACHINE
<br />
![](./public/SINGLE_MACHINE.png?raw=true "Single machine page")
<br />
This tab has 5 fields to fill out: <br />
  device address, <br />
  connection port for ssh, <br />
  login for ssh, <br />
  password for ssh, <br />
  bash command to execute. <br />
And 5 buttons: <br />
  **ping** - pings the device to the specified address, <br />
  **external statistic** - scans device ports, tries to install OS version, vendor, etc. (node ​​nmap), <br />
  **ssh connect** - creates an ssh session with the device, <br />
  **internal statistic** - displays internal data about the machine (with current ssh login and password), <br />
  **execute command** - executes a command on a remote device (with current ssh login and password).
  <br />


  2.CURRENT_NETWORK
  <br />
  ![](./public/CURRENT_NETWORK.png?raw=true "Current network page")
  <br />
  There are 2 fields:
   to specify a range of addresses for scanning (you can specify the entire local network by clicking on the autodetection button), <br />
   to specify the table name when saving. <br />
  And buttons: <br />
  **quickScan** - fast ping scan of devices (several seconds per machine), <br />
  **detailedScan** - detailed scanning of devices (few minutes per vehicle), <br />
  **terminal** - display the result using the terminal, <br />
  **table** - display the result using the graphical interface, <br />
  **cleanTable** - clear the current list of devices, <br />
  **saveTable** - save this table (will be displayed in the IP_TABLES tab) <br />
  <br />

  3.IP_TABLES
<br />
![](./public/IP_TABLES.png?raw=true "IP tables page")
<br />
At the top of the page, there is a list of saved tables (switching between them by clicking on the corresponding button)
Next comes information about the table and a button to change it.
Below are provided buttons for sorting the list of devices in the table (flips the table when pressed again)
Next comes the table itself, which presents the following data about each device:
  *hostname*, <br />
  *ip*, <br />
  *description*, <br />
  *ssh login*, (indicates the possibility of remote access) <br />
  *MAC* of the network device.
  list of *available scripts* for this device. <br />
This data can be changed by clicking on the **change** button <br />
The following operations are available for each device (by pressing the corresponding buttons): <br />

**jump** - goes to the SINGLLE_MACHINE tab with the substitution of the corresponding device data <br />
  **check** - ping check if the device is online <br />
  **turnOn** - if there is a MAC address, turns on the device using WakeOnLan (bios configuration required) <br />
  **del** - removes the device from the list, <br />
  **reset** - reset the current device status, <br />
  **change** - change device data, create / delete available scripts; <br />
  Device statuses (by color):
  <br />
  *black* - the device is recorded in the table, but its presence in the network was not checked, <br />
  *green* - the device is (was) in the network, <br />
  *red* - the device is not (was not) in the network, <br />
  *blue* - the device is (was) in the network, but not saved in the table; <br />
<br />

There are the following options for working with the table:<br />
  **save changes** - overwrites the current table (saves all changes) <br />
  **check table** - fast ping check of all table devices, <br />
  **check table within network** - fast ping check of all table devices as well as all devices in the range specified in the table description, fast ping check of all table machines<br />
  **RTS (2min)** - (Real Time Scanning) scan the table and network with a frequency of 2 min / stop scanning<br />
  **add machine** - adds a device with blank data to the table, <br />
  **del table** - deletes the given table
  <br />


  Technologies used
    <br />
    React (CRA) (Router) <br />
    Redux (thunk) <br />
    Electron <br />
    eslint (react, airbnb) <br />
    SCSS (modules) <br />
