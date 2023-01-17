module.exports = (req, res) => {
    const {data} = req.body
    console.log(data)

    res.json({message: 'Successfully updated profile picture', imageLink: 'https://img.freepik.com/premium-vector/itachi-uchiha-art-cartoon-vector-isolated_528506-47.jpg?w=2000'})
}
