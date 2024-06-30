import Slider from "react-slick";


const data = [{
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
          "street": "123 Main St",
          "city": "Anytown",
          "state": "CA",
          "zip": "12345"
      },
      "phoneNumbers": [
          "555-1234",
          "555-5678"
      ]
  },
  {
      "id": 2,
      "name": "Jane Smith",
      "age": 25,
      "email": "jane.smith@example.com",
      "address": {
          "street": "456 Oak St",
          "city": "Othertown",
          "state": "NY",
          "zip": "67890"
      },
      "phoneNumbers": [
          "555-8765",
          "555-4321"
      ]
  },
  {
      "id": 3,
      "name": "Emily Johnson",
      "age": 35,
      "email": "emily.johnson@example.com",
      "address": {
          "street": "789 Pine St",
          "city": "Somecity",
          "state": "TX",
          "zip": "54321"
      },
      "phoneNumbers": [
          "555-1111",
          "555-2222"
      ]
  }
]


const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500
  };
const SliderCustom = () => {
      return (
        <div className="slider-container">
          <Slider {...settings}>
            {data.map((item) => {
              return (
                <div key={item.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.email}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
      );
}

export default SliderCustom

