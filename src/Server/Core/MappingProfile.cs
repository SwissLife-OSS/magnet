using AutoMapper;

namespace Magnet;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        this.CreateMap<MagnetMessage, MessageRecord>();
    }
}
