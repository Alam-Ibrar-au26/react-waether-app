import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GetWeatherDetails } from '../redux/Actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import { FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import { BsTwitter, BsInstagram } from 'react-icons/bs';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  componentDidMount() {
    const { GetWeatherDetails } = this.props.action;
    GetWeatherDetails();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { searchInput } = this.state;
    const { GetWeatherDetails } = this.props.action;
    if (searchInput) GetWeatherDetails(this.state.searchInput);
    this.setState({ searchInput: '' });
  };
  handleOnChange = (e) => {
    this.setState({
      searchInput: e.target.value,
    });
  };
  render() {
    const { data, success } = this.props.weatherData;
    const { name, main } = data;
    const { searchInput } = this.state;

    return (
      <>
        <div className='container'>
          <form className='search-form' onSubmit={this.handleSubmit}>
            <input
              className='inp'
              type='text'
              placeholder='Search Weather by City'
              value={searchInput}
              onChange={(e) => this.handleOnChange(e)}
            />
            <button className='searchImg'>
              <BiSearch />
            </button>
          </form>
          <div className='info'>
            <span className='location'>Weather in {success ? name : null}</span>
            <div className='forecast-info'>
              <div className='forecast-value'>
                <div className='degrees'>
                  <span className='degrees-count'>
                    {success ? main.temp : null}
                  </span>
                  °C
                </div>
              </div>
            </div>
            <div className='additional-info'>
              <ul className='list'>
                <li>
                  <b>Humidity: </b> {success ? main.humidity : null}
                </li>
                <li>
                  <b>Wind Speed: 3.4km/hr</b> {success ? main.wind_speed : null}
                </li>
              </ul>
            </div>
            <div className='sm-icons'>
              <span className='fb'>
                <FaFacebookF />
              </span>
              <span className='tw'>
                <BsTwitter />
              </span>
              <span className='in'>
                <FaLinkedinIn />
              </span>
              <span className='insta'>
                <BsInstagram />
              </span>
            </div>
          </div>
        </div>
        <ToastContainer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  weatherData: state,
});

const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators({ GetWeatherDetails }, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Weather);
