import React, { useState } from 'react'
import useLocationForm from "./useLocationForm";
import Select from "react-select";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import '../../sass/cart/checkoutCart.scss'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAddress } from '../../redux/address/addressSlice';
const ModalAddress = ({ showAddressItem, setShowAddressItem }) => {
    const handleClickAddressItem = () => {
        setShowAddressItem(false)
    }

    const [name,setName] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')

    const dispatch = useDispatch()

    const { handleSubmit, register } = useForm()

    const [validateForm, setvalidateForm] = useState({
        name: "",
        phone: "",
        city: "",
        district : "",
        ward : "",
        street: ""
      });
    const {
        state,
        onCitySelect,
        onDistrictSelect,
        onWardSelect,
        onSubmit
      } = useLocationForm(false);
    
      const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard
      } = state;

    // console.log(selectedCity)
    
      const handleOnSubmit = (e) =>{
            e.preventDefault()
          

            const data = {
                id: data._id,
                name: name,
                phone: phone,
                address: address + ' ,' + selectedWard.label + ' ,' + selectedDistrict.label + ' ,' + selectedCity.label
            }

            console.log(data)

            dispatch(addAddress(data))
            setShowAddressItem(false)

           
      }

      return (
        <Modal
            open={showAddressItem}
            onClose={handleClickAddressItem}
            classNames={{
                overlay: 'customOverlay',
                modal: 'custom-modal-detail-order',
            }}
        >

            <div className="form-address">
                <form
                    onSubmit={handleOnSubmit}
                    
                    >
                    <h3>Th??m ?????a ch??? m???i</h3>

                    <div className="select-group">

                    <input name='name' type="text" placeholder='Nh???p h??? t??n'
                            onChange={(e) => setName(e.target.value)} required    />

                    <input 
                            style={{
                                marginBottom: '20px'
                            }}
                            name='phone' type="text" placeholder='Nh???p s??? ??i???n tho???i'
                            onChange={(e) => setPhone(e.target.value)} required  />

                        <Select
                        name="cityId"
                        key={`cityId_${selectedCity?.value}`}
                        isDisabled={cityOptions.length === 0}
                        options={cityOptions}
                        onChange={(option) => onCitySelect(option)}
                        placeholder="T???nh/Th??nh"
                        defaultValue={selectedCity}
                        required
                        />

                        <br />

                        <Select
                        name="districtId"
                        key={`districtId_${selectedDistrict?.value}`}
                        isDisabled={districtOptions.length === 0}
                        options={districtOptions}
                        onChange={(option) => onDistrictSelect(option)}
                        placeholder="Qu???n/Huy???n"
                        defaultValue={selectedDistrict}
                        required
                        />
                        <br />
                        <Select
                        name="wardId"
                        key={`wardId_${selectedWard?.value}`}
                        isDisabled={wardOptions.length === 0}
                        options={wardOptions}
                        placeholder="Ph?????ng/X??"
                        onChange={(option) => onWardSelect(option)}
                        defaultValue={selectedWard}
                        required
                        />

                        <input name='address' type="text" placeholder='Nh???p ?????a ch??? c??? th???'
                            onChange={(e) => setAddress(e.target.value)}  required/>

                        <div className="default">
                            <input type="checkbox" style={{width : 'auto'}}/> ?????t l??m ?????a ch??? m???t ?????nh
                            
                        </div>
                    </div>

                    <button
                        type="submit"
                    >
                        X??c nh???n
                    </button>
                    </form>
            </div>
        </Modal >
      )
}

export default ModalAddress
